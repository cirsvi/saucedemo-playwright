export const ERRORS = {
    FIRST_NAME_REQUIRED: 'First Name is required',
    LAST_NAME_REQUIRED: 'Last Name is required',
    ZIP_CODE_REQUIRED: 'Postal Code is required',
    FIRST_NAME_SPECIAL_CHARS: 'First Name must contain only letters, spaces, and hyphens.',
    LAST_NAME_SPECIAL_CHARS: 'Last Name must contain only letters, spaces, and hyphens.',
    ZIP_CODE_SPECIAL_CHARS: 'Zip code must contain only letters and numbers.',
    FIRST_NAME_MAX_LEN: 'First Name must be under 50 characters.',
    LAST_NAME_MAX_LEN: 'ast Name must be under 50 characters.',
    ZIP_CODE_MAX_LEN: 'Zip code must be under 10 characters.',
    LOCKED_OUT_USER: 'Sorry, this user has been locked out.',
    PASSWORD_REQUIRED: 'Password is required',
    USERNAME_REQUIRED: 'Username is required',
    INVALID_CREDENTIALS: 'Username and password do not match any user in this service'
} as const;