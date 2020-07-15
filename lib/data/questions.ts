export const questions = {
  language: {
    type: 'list',
    name: 'language',
    message: 'Which language would you like to use?',
    choices: ['Typescript', 'Javascript'],
  },
  packageManager: {
    type: 'list',
    name: 'package',
    message: 'Which Package Manager would you like to use?',
    choices: ['NPM', 'Yarn'],
  },
}

export interface IUserAnswers {
  language: string
  package: string
}
