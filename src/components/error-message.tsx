interface ErrorMessageProps {
  code?: number;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, code }) => {
  return (
    <article className='message is-danger'>
      <div className='message-header'>
        <p>Error</p>
      </div>
      <div className='message-body'>{message}</div>
    </article>
  );
};

export default ErrorMessage;
