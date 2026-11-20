const logger = (config) => (set, get) => config(
  (...args) => {
    console.log('prev state', get())
    set(...args)
    console.log('next state', get())
  },
  get
)

export default logger

/*
config is your initializer, the (set, get) => ({ tallies: [], ... }) function you normally hand straight to create

So logger(yourInitializer) returns a new initializer: same shape, takes (set, get), returns the state object. create can’t tell the difference.

When create calls that new initializer, it passes in the real set and get. The middleware then calls your initializer, but hands it a different first argument.



*/