import { title } from 'process'
import Logo from '../../app/components/Logo'
import NavBar from '../../app/components/NavBar'
import SessionController from '../../app/components/SessionController'
import confirm from '../../core/utils/confirm'
import info from '../../core/utils/info'
import * as DL from './Default.layout.styles'

interface DefaultLayoutProps {
  children: React.ReactNode
}

function DefaultLayout (props: DefaultLayoutProps) {
  return <DL.Wrapper>
    <DL.Header>
      <Logo />
    </DL.Header>
    <DL.Main>
      <DL.Navigation>
        <NavBar />
      </DL.Navigation>
      <DL.FeaturedContent>
        { props.children }
      </DL.FeaturedContent>
      <DL.Aside>
        <SessionController
          name="Daniel Bonifacio"
          description="editor há 2 anos"
          onLogout={() => {
            confirm({
              title: 'Vc quer deslogar?',
              onConfirm: () => {
                info({
                  title: 'Você foi deslogado',
                  description: 'Você será redirecionado para a página de login'
                })
              },
              onCancel: () => window.alert('laranja')
            })
          }}
        />
      </DL.Aside>
    </DL.Main>
  </DL.Wrapper>
}

export default DefaultLayout