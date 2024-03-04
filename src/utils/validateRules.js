const emailRule = {
  pattern: {
    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message: 'Please enter a valid email'
  }
}

export { emailRule } 
