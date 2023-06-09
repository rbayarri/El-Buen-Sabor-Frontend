export const measurementUnitData = [
    {
        name: "GRAMS",
        nombre: "gramos",
        other: [
            {
                name: "KILOGRAMS",
                nombre: "kilogramos",
            },
            {
                name: "MILIGRAMS",
                nombre: "miligramos",
            }
        ]
    },
    {
        name: "KILOGRAMS",
        nombre: "kilogramos",
        other: [
            {
                name: "GRAMS",
                nombre: "gramos",
            },
            {
                name: "MILIGRAMS",
                nombre: "miligramos",
            }
        ]
    },
    {
        name: "MILIGRAMS",
        nombre: "miligramos",
        other: [
            {
                name: "GRAMS",
                nombre: "gramos",
            },
            {
                name: "KILOGRAMS",
                nombre: "kilogramos",
            }
        ]
    },
    {
        name: "LITERS",
        nombre: "litros",
        other: [
            {
                name: "MILILITERS",
                nombre: "mililitros",
            }
        ]
    },
    {
        name: "MILILITERS",
        nombre: "mililitros",
        other: [
            {
                name: "LITERS",
                nombre: "litros",
            }
        ]
    },
    {
        name: "UNITS",
        nombre: "unidades",
        other: []
    },
]

export const getMeasurementUnits = (measurementUnit: string) => {
    return measurementUnitData.find(mu => mu.name === measurementUnit)
}