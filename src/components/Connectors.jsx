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

    // Volvemos a la función que dibuja líneas con codos rectos
    const getElbowPath = (startPos, endPos) => {
        const x1 = startPos.left + startPos.width;
        const y1 = startPos.top + startPos.height / 2;
        const x2 = endPos.left;
        const y2 = endPos.top + endPos.height / 2;

        // Calculamos el punto medio horizontal para el "codo"
        const midX = x1 + (x2 - x1) / 2;

        // Trazado: Mover a inicio -> Línea horizontal hasta el codo -> Línea vertical -> Línea horizontal hasta el final
        return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`;
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
                            d={getElbowPath(startNode, endNode)} // Usamos la función de líneas rectas
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