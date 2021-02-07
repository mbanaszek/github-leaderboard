module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec|steps))\\.(jsx?|tsx?)$',
    testMatch: null,
    testPathIgnorePatterns: ['/lib/', '/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: false,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testTimeout: 70000,
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
};
