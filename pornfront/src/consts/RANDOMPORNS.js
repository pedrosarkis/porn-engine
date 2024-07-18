const randomPornActressWorldwide = [
    "Mia khalifa",
    "Riley reid",
    "Alexis texas",
    "Lana rhoades",
    "Abella danger",
    "Brandi love",
    "SARA JAY",
    "Lisa ann",
    "Mia malkova",
    "Eva elfie",
    "Angela white",
    "Natasha nice",
    "Alura jenson",
    "Alexis fawx",
    "Sheena ryder",
    "Rita faltoyano",
]

const randomPornActressBr = [
    "Mia linz",
    "Elisa sanches",
    "Dread hot",
    "Alessandra marques",
    "Emme white",
    "Gina valentina",
    "Sexy angel",
    "Monica lima",
    "Shayenne samara",
    "Angel lima",
    "Britney bich",
    "Alessandra carvalho",
]

const randomPornActress = {
    "worldwide": randomPornActressWorldwide,
    "br": randomPornActressBr,
}

const getRandomPornActress = (location = "worldwide") => {
    return randomPornActress[location][Math.floor(Math.random() * randomPornActress[location].length)]
}

export default getRandomPornActress