const emailPattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-])[A-Za-z\d@$!%*?&-]{8,24}$/;

// values: {email: , password: }
function validateUser(values) {
    const errors = {};

    // 이메일 유효성 검사
    if (!values.email) {
        errors.email = '이메일을 반드시 입력해주세요.';
    } else if (!emailPattern.test(values.email)) {
        errors.email = '올바른 이메일 형식이 아닙니다. 다시 확인해주세요!';
    }

    // 비밀번호 유효성 검사
    if (!values.password) {
        errors.password = '비밀번호는 필수 입력 요소입니다.';
    } else if (!passwordPattern.test(values.password)) {
        errors.password = '비밀번호는 8~24자 이내, 영문 대소문자, 숫자, 특수기호를 포함해야 합니다.';
    }

    return errors;
}

export function validateLogin(values) {
    const errors = validateUser(values);

    if (!emailPattern.test(values.email) || !passwordPattern.test(values.password)){
        errors.login = '아이디 또는 비밀번호를 다시 확인해주세요.';
    }

    return errors;
}

export function validateSignup(values) {
    const errors = validateUser(values);

    // 비밀번호 확인 유효성 검사
    if (!values.passwordCheck) {
        errors.passwordCheck = '비밀번호 검증 또한 필수 입력 요소입니다.';
    } else if (values.passwordCheck !== values.password) {
        errors.passwordCheck = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
}