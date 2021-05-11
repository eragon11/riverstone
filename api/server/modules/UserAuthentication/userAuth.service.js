import jwt from 'jsonwebtoken';

const userAuthService = {};
const JWT_SECRET = "this is a JWTSECRET!!";

userAuthService.getJwtToken = async (payload) => {

    const token = await jwt.sign({
        data: payload
    }, JWT_SECRET, { expiresIn: '1d' });
    payload.token = token;

    return payload;
}

userAuthService.verifyAndDecode = (token) => {
    let decodedPayload = {};
    try {
        decodedPayload = jwt.verify(token, JWT_SECRET);
        if (decodedPayload.exp >= (Date.now() / 1000)) {
            decodedPayload.valid = true;
        } else
            decodedPayload.valid = false;
    } catch (error) {
        return decodedPayload.valid = false;
    }
    return decodedPayload;
};
export default userAuthService;


