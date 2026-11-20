import { useToast } from '../toastStore'

const Toast = () => {
  const message = useToast()

  if (!message) {
    return null
  }

  const style = {
    border: 'solid',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  }

  return <div data-testid="toast" style={style}>{message}</div>
}

export default Toast