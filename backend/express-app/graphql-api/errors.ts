export enum CustomErrorName {
    RepositoryNotFound = 'RepositoryNotFound',
    CanNotFetchRepositoryStats = 'CanNotFetchRepositoryStats',
    UnknownError = 'UnknownError',
}

export const isCustomErrorName = (errorName: string): errorName is CustomErrorName => {
    return Object.values(CustomErrorName).includes(errorName as CustomErrorName);
}

export const getErrorCode = (errorName: CustomErrorName): number => {
    switch (errorName) {
        case CustomErrorName.RepositoryNotFound:
            return 404;
        case CustomErrorName.CanNotFetchRepositoryStats:
        case CustomErrorName.UnknownError:
            return 404;
    }
}

export const getErrorMessage = (errorName: CustomErrorName): string => {
    switch (errorName) {
        case CustomErrorName.RepositoryNotFound:
            return 'Repository not found.';
        case CustomErrorName.CanNotFetchRepositoryStats:
            return 'Can not fetch repository stats.'
        case CustomErrorName.UnknownError:
            return 'Unknown error.'
    }
}