// from http://emailregex.com/
const email = /^(?!.*^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/
const username = /[^a-zA-Z0-9]/

export const CustomRegExp = {
  email,
  username
}
