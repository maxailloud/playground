import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: ['**/dist'],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
                    depConstraints: [
                        {
                            sourceTag: '*',
                            onlyDependOnLibsWithTags: ['*'],
                        },
                    ],
                },
            ],
        },
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.cts',
            '**/*.mts',
            '**/*.js',
            '**/*.jsx',
            '**/*.cjs',
            '**/*.mjs',
        ],
        rules: {
            "max-len": [
                "error",
                {
                    "code": 140,
                    "ignoreComments": true
                }
            ],
            "no-multiple-empty-lines": [
                "error",
                {
                    "max": 1,
                    "maxEOF": 1,
                    "maxBOF": 1
                }
            ],
            "@typescript-eslint/explicit-module-boundary-types": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/array-type": "off",
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/no-use-before-define": "error",
            "@typescript-eslint/consistent-type-definitions": "error",
            "@typescript-eslint/explicit-member-accessibility": "error",
            "@angular-eslint/component-class-suffix": "error",
            "@angular-eslint/contextual-lifecycle": "error",
            "@angular-eslint/directive-class-suffix": "error",
            "@angular-eslint/no-conflicting-lifecycle": "error",
            "@angular-eslint/no-input-rename": "error",
            "@angular-eslint/no-inputs-metadata-property": "error",
            "@angular-eslint/no-output-native": "error",
            "@angular-eslint/no-output-on-prefix": "error",
            "@angular-eslint/no-output-rename": "error",
            "@angular-eslint/no-outputs-metadata-property": "error",
            "@angular-eslint/use-lifecycle-interface": "error",
            "@angular-eslint/use-pipe-transform-interface": "error",
        },
    },
    {
        "files": ["*.component.html"],
        "rules": {
            "@angular-eslint/template/banana-in-box": "error",
            "@angular-eslint/template/no-negated-async": "error",
            "@angular-eslint/template/eqeqeq": "error"
        }
    }
];
