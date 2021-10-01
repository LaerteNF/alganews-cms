import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Confirm from '../../app/components/Confirm/Confirm';

interface ConfirmProps {
  title: string
  onConfirm?: (...args: any[]) => void;
  onCancel?: (...args: any[]) => void;
}

export default function confirm (props: ConfirmProps) {
  // encapsulada dentro do setTimeout para se tornar uma Macrotask (executar por ultimo) pois após o onConfirm aonde esta função
  // é recebida como parametro existe um onClose que deve ser executado antes dessa função para fechar o modal anterior e depois este ser aberto
  setTimeout(() => {
    confirmAlert({
      overlayClassName: 'confirm-overlay',
      customUI: ({ onClose }) => {
        return (
          <Confirm 
            title={props.title}
            onConfirm={() => {
              if (props.onConfirm)
                props.onConfirm()
              onClose()
            }}
            onCancel={() => {
              if (props.onCancel)
                props.onCancel()
              onClose()
            }}
          />
        );
      }
    });
  }, 0)

}