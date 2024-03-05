const emailRule = {
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please enter a valid email'
  }
}

const passwordRule = {
  minLength: {
    value: 6,
    message: 'Password should be at least 6 characters' // -- based on firebase weak-password rule
  },
  maxLength: {
    value: 150,
    message: 'Password length should not exceed 150 characters'
  },
  pattern: {
    value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    message: 'Your password must contain at least one number, one uppercase and one lowercase letter'
  }
}

export { emailRule, passwordRule } 
