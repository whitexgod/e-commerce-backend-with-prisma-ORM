import 'dotenv/config'

export const config = {
    port: process.env.PORT || 4000,
    saltValue: process.env.SALT_VALUE || 10
}