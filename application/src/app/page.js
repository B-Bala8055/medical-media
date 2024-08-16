import { oAuthLogin } from '@/utils/actions/auth'

export default function Home() {
  return (
    <main className='container container-lg mt-5'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-4'>
          <div class="card">
            <div class="card-body">
              <h3 className='text-center mb-3'>Authenticate</h3>

              {/* <div class="col-md-3">
    <a class="btn btn-outline-dark" href="/users/googleauth" role="button" style="text-transform:none">
      <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
      Login with Google
    </a>
  </div> */}

              <form action={oAuthLogin} method='POST' encType='text/plain'>
                <button className='btn btn-outline-dark' type="submit" name="action" value="google">
                  <img width="20px" style={{ marginBottom: '3px', marginRight: '5px' }} alt="Google" src={require('../dist/icons/google.png')} />
                  Google Sign IN
                </button>
              </form>
            </div>
          </div>

        </div>
        <div className='col-12 col-sm-12 d-md-flex sd-sm-none col-md-8'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint quos quidem doloremque veritatis vitae vero voluptatibus, pariatur sed provident reiciendis necessitatibus eveniet quas iusto. Delectus id eveniet tenetur nihil nulla!
        </div>
      </div>
    </main>
  );
}
