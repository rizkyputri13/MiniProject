import { useRouter } from 'next/router';
import Page from '../../component/commons/Page';
import AppLayout from '../../component/layout/AppLayout';

export default function Batch() {
  let navigate = useRouter()
  return (
    <AppLayout>
      <Page title='Batch' titleButton='Create' onClick={() => navigate('/app/batch/new')}>
        <h2>Test</h2>
      </Page>
    </AppLayout>
  )
}
