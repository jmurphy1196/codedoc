import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
        <style>
            body {
                background-color: white;
            } 
        </style> 
    <head>
    <body>
      <div id='root'></div> 
      <script>
        const handleError = (err) => {

            const root = document.getElementById('root');
            root.innerHTML = '<div style="color: red; "><h4>RUNTIME ERROR</h4>' + err +  '</div>'
            console.error(err)

        }
        window.addEventListener('error', (event) => {
            event.preventDefault()
            handleError(event.error)

        })
        window.addEventListener('message', (event) => {
          try {
          eval(event.data)
          } catch(err){
            handleError(err)
          }
        }, false) 
      </script>
    </body>

  </html>

`;
const Preview: React.FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    let codeDebounce = setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
    return () => {
      if (codeDebounce) {
        clearTimeout(codeDebounce);
      }
    };
  }, [code, iframe.current]);
  return (
    <div className='iframe-wrapper'>
      <iframe
        title='code preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
      {err && <div className='preview-error'>{err}</div>}
    </div>
  );
};

export default Preview;
