const request = require("supertest");
import app from "../app";
const userAuthService = require("../server/modules/UserAuthentication/userAuth.service").default;

describe('Test the user routes',()=>{
    let token;
    beforeEach(async()=>{
        let payload = {
            "user_name": "eragon",
            "email": "era@gmail.com",
            "status": "active",
            "is_admin": true
        }

        token = (await userAuthService.getJwtToken(payload)).token;
    })

    it('Get user route', async()=>{
        let res = await request(app).get("/api/users").set("xauthtoken",token);
        console.log(res.body);
        expect(res.statusCode).toBe(200)
    })
})