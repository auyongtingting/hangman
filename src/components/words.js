var programming_languages = [
    "python",
    "javascript",
    "mongodb",
    "json",
    "java",
    "html",
    "css",
    "c",
    "csharp",
    "golang",
    "kotlin",
    "php",
    "sql",
    "ruby",
    "fortran",
    "php"
]

function randomWord () {
    return programming_languages[Math.floor(Math.random() * programming_languages.length)] // Round down -> (Math.random - 0 to 1 * Length of the array above)
}

export { randomWord }