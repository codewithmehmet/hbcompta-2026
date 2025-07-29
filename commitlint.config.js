module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // nouvelle fonctionnalité
        "fix", // correction de bug
        "docs", // documentation
        "style", // formatage, point-virgules manquants, etc.
        "refactor", // refactoring du code
        "perf", // amélioration des performances
        "test", // ajout ou modification de tests
        "chore", // tâches de maintenance
        "ci", // changements CI/CD
        "build", // changements du système de build
        "revert", // annulation d'un commit précédent
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 200],
    "footer-max-line-length": [2, "always", 200],
  },
};
