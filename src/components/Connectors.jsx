// src/components/Connectors.js
import React from 'react';

const TYPE_COLORS = {
    basica: '#e02f37',
    complementaria: '#3d85c6',
    especialidad: '#ffc40e',
    electiva: '#6aa84f',
};

const Connectors = ({ courses, positions }) => {
    if (Object.keys(positions).length === 0) {
        return null;
    }

    // Sistema avanzado de enrutamiento que evita colisiones
    const findOptimalPath = (startPos, endPos, allPositions, startCourseId, endCourseId) => {
        const x1 = startPos.left + startPos.width;
        const y1 = startPos.top + startPos.height / 2;
        const x2 = endPos.left;
        const y2 = endPos.top + endPos.height / 2;

        // Crear lista de obstáculos (todas las materias excepto origen y destino)
        const obstacles = Object.entries(allPositions)
            .filter(([courseId]) => courseId !== startCourseId && courseId !== endCourseId)
            .map(([, pos]) => ({
                left: pos.left - 15,
                right: pos.left + pos.width + 15,
                top: pos.top - 15,
                bottom: pos.top + pos.height + 15
            }));

        // Función para verificar si un punto está dentro de un obstáculo
        const isPointInObstacle = (x, y) => {
            return obstacles.some(obs => 
                x >= obs.left && x <= obs.right && y >= obs.top && y <= obs.bottom
            );
        };

        // Función para verificar si una línea horizontal está libre
        const isHorizontalLineClear = (y, x1, x2) => {
            const step = Math.sign(x2 - x1) * 5;
            for (let x = x1; Math.abs(x - x2) > 5; x += step) {
                if (isPointInObstacle(x, y)) return false;
            }
            return !isPointInObstacle(x2, y);
        };

        // Función para verificar si una línea vertical está libre
        const isVerticalLineClear = (x, y1, y2) => {
            const step = Math.sign(y2 - y1) * 5;
            for (let y = y1; Math.abs(y - y2) > 5; y += step) {
                if (isPointInObstacle(x, y)) return false;
            }
            return !isPointInObstacle(x, y2);
        };

        // Generar niveles de enrutamiento alternativos
        const getRoutingLevels = () => {
            const levels = [];
            
            // Nivel 0: Línea directa entre puntos medios
            levels.push(y1, y2);
            
            // Niveles adicionales: Por encima y por debajo
            const minY = Math.min(...Object.values(allPositions).map(pos => pos.top)) - 40;
            const maxY = Math.max(...Object.values(allPositions).map(pos => pos.top + pos.height)) + 40;
            
            // Crear niveles de enrutamiento cada 60px
            for (let y = minY; y <= maxY; y += 60) {
                levels.push(y);
            }
            
            // Ordenar por proximidad a la línea ideal
            const idealY = (y1 + y2) / 2;
            return [...new Set(levels)].sort((a, b) => 
                Math.abs(a - idealY) - Math.abs(b - idealY)
            );
        };

        // Intentar diferentes estrategias de enrutamiento
        const routingLevels = getRoutingLevels();

        // Estrategia 1: Codo simple estándar
        const midX = x1 + (x2 - x1) / 2;
        if (isHorizontalLineClear(y1, x1, midX) && 
            isVerticalLineClear(midX, y1, y2) && 
            isHorizontalLineClear(y2, midX, x2)) {
            return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
        }

        // Estrategia 2: Enrutamiento en niveles alternativos
        for (const routeY of routingLevels) {
            // Probar ruta con un nivel intermedio
            if (isHorizontalLineClear(y1, x1, x1 + 40) &&
                isVerticalLineClear(x1 + 40, y1, routeY) &&
                isHorizontalLineClear(routeY, x1 + 40, x2 - 40) &&
                isVerticalLineClear(x2 - 40, routeY, y2) &&
                isHorizontalLineClear(y2, x2 - 40, x2)) {
                
                return `M ${x1} ${y1} L ${x1 + 40} ${y1} L ${x1 + 40} ${routeY} L ${x2 - 40} ${routeY} L ${x2 - 40} ${y2} L ${x2} ${y2}`;
            }
        }

        // Estrategia 3: Enrutamiento por los bordes
        const containerBounds = {
            top: Math.min(...Object.values(allPositions).map(pos => pos.top)) - 50,
            bottom: Math.max(...Object.values(allPositions).map(pos => pos.top + pos.height)) + 50,
            left: Math.min(...Object.values(allPositions).map(pos => pos.left)) - 50,
            right: Math.max(...Object.values(allPositions).map(pos => pos.left + pos.width)) + 50
        };

        // Probar ruta por arriba
        const topRoute = containerBounds.top;
        if (isVerticalLineClear(x1 + 20, y1, topRoute) &&
            isHorizontalLineClear(topRoute, x1 + 20, x2 - 20) &&
            isVerticalLineClear(x2 - 20, topRoute, y2)) {
            
            return `M ${x1} ${y1} L ${x1 + 20} ${y1} L ${x1 + 20} ${topRoute} L ${x2 - 20} ${topRoute} L ${x2 - 20} ${y2} L ${x2} ${y2}`;
        }

        // Probar ruta por abajo
        const bottomRoute = containerBounds.bottom;
        if (isVerticalLineClear(x1 + 20, y1, bottomRoute) &&
            isHorizontalLineClear(bottomRoute, x1 + 20, x2 - 20) &&
            isVerticalLineClear(x2 - 20, bottomRoute, y2)) {
            
            return `M ${x1} ${y1} L ${x1 + 20} ${y1} L ${x1 + 20} ${bottomRoute} L ${x2 - 20} ${bottomRoute} L ${x2 - 20} ${y2} L ${x2} ${y2}`;
        }

        // Estrategia de último recurso: línea directa
        return `M ${x1} ${y1} L ${x2} ${y2}`;
    };

    const courseTypeMap = courses.reduce((acc, course) => {
        acc[course.id] = course.type;
        return acc;
    }, {});

    return (
        <svg className="connector-svg">
            <defs>
                {Object.entries(TYPE_COLORS).map(([type, color]) => (
                    <marker
                        key={type}
                        id={`arrowhead-${type}`}
                        viewBox="0 0 10 10"
                        refX="8"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
                    </marker>
                ))}
            </defs>

            {courses.map(course =>
                course.prerequisites.map(prereqId => {
                    const startNode = positions[prereqId];
                    const endNode = positions[course.id];

                    if (!startNode || !endNode) return null;

                    const prereqType = courseTypeMap[prereqId] || 'especialidad';
                    const strokeColor = TYPE_COLORS[prereqType];

                    return (
                        <path
                            key={`${prereqId}-${course.id}`}
                            d={findOptimalPath(startNode, endNode, positions, prereqId, course.id)} // Usamos el sistema avanzado
                            stroke={strokeColor}
                            strokeWidth="2.5"
                            fill="none"
                            markerEnd={`url(#arrowhead-${prereqType})`}
                        />
                    );
                })
            )}
        </svg>
    );
};

export default Connectors;