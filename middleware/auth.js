export default function ({ store, redirect }) {
  if (store.state.authUser === null) {
    redirect('/login')
  }
}
