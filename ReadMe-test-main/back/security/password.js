import passwordValidator from 'password-validator';

const pwSchema = new passwordValidator();

pwSchema
.is().min(6)
.is().max(16)
.has().uppercase()
.has().lowercase()
.has().letters()
.has().digits(1)  
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123', 'Password0000']); 

export default pwSchema;