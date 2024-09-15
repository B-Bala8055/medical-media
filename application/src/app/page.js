import { oAuthLogin } from '@/utils/actions/auth'
import Image from 'next/image';
import { redirect } from 'next/navigation'
import GoogleLogo from '../static/icons/google.png'
import { auth } from '@/utils/authentication/auth';

export default async function Home() {

  const session = await auth()

  if (session?.user) redirect("/discussion")

  return (
    <main className='container container-lg mt-5'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-4'>
          <div className="card" style={{ height: '70vh' }}>
            <div className="card-body text-center">
              <h4 className='mb-4'>Authenticate</h4>

              <form action={oAuthLogin}>
                <button className='btn btn-outline-dark' type="submit" name="action" value="google">
                  <Image style={{ marginBottom: '3px', marginRight: '5px', width: "30px", height: "30px" }} alt="Google" src={GoogleLogo} />
                  Continue with Google
                </button>
              </form>
            </div>
          </div>

        </div>
        <div className='col-12 col-sm-12 d-md-flex sd-sm-none col-md-8 flex-column'>
          <h4 className='mb-4'>Hot Discussions</h4>
        </div>
      </div>
    </main>
  );
}
