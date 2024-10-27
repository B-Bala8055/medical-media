import { oAuthLogin } from '@/utils/actions/auth'
import Image from 'next/image';
import { redirect } from 'next/navigation'
import GoogleLogo from '../static/icons/google.png'
import YandexLogo from '../static/icons/yandex.svg'
import FacebookLogo from '../static/icons/facebook.png'
import { auth } from '@/utils/authentication/auth';

export default async function Home() {

  const session = await auth()

  if (session?.user) redirect("/discussion")

  return (
    <main className='container container-lg mt-5 mb-3'>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-4 mb-3'>
          <div className="card pb-2" style={{ height: 'auto' }}>
            <div className="card-body text-center">
              <h4 className='mb-2'>Authenticate</h4>
              <p className="text-muted"><small>We currently offer the following modes of authentication. By Signing in, you agree to our terms and conditions.</small></p>
              <form action={oAuthLogin}>
                <button className='btn btn-outline-dark mb-3' style={{ width: '80%' }} type="submit" name="action" value="google">
                  <Image style={{ marginBottom: '3px', marginRight: '5px', width: "30px", height: "30px" }} alt="Google" src={GoogleLogo} />
                  Continue with Google
                </button>
                <button className='btn btn-primary mb-3' style={{ width: '80%' }} type="submit" name="action" value="facebook">
                  <Image style={{ marginBottom: '3px', marginRight: '8px', width: "30px", height: "30px" }} alt="Facebook" src={FacebookLogo} />
                  Login with Facebook
                </button>
                <button className='btn btn-dark' style={{ width: '80%' }} type="submit" name="action" value="yandex">
                  <Image style={{ marginBottom: '3px', marginRight: '5px', width: "30px", height: "30px" }} alt="Yandex" src={YandexLogo} />
                  Continue with Yandex
                </button>
              </form>
            </div>
          </div>

        </div>
        <div className='col-12 col-sm-12 d-md-flex sd-sm-none col-md-8 flex-column'>
          <h4 className='mb-4'>Introduction</h4>
          <p>By joining this Physician Exchange Forum, you can enrich your practice and contribute to a community committed to excellence in healthcare!</p>
          <ul className="list-group">

            <li className="list-group-item"> <b>Collaborative Learning</b>: Share experiences and insights with colleagues, fostering a culture of continuous learning and professional development.</li>

            <li className="list-group-item"> <b>Access to Diverse Expertise</b>: Connect with specialists across various fields to gain different perspectives on complex cases and treatment options.</li>

            <li className="list-group-item"> <b>Peer Support</b>: Seek advice and reassurance from fellow physicians, reducing the isolation that can sometimes accompany medical practice.</li>

            <li className="list-group-item"> <b>Case Discussions</b>: Engage in discussions about unique or challenging cases, allowing for collaborative problem-solving and innovative approaches.</li>

            <li className="list-group-item"> <b>Stay Updated</b>: Access the latest research, guidelines, and medical advancements shared by peers, helping you stay informed in an ever-evolving field.</li>

            <li className="list-group-item"> <b>Networking Opportunities</b>: Build a professional network that can lead to referrals, mentorship, and potential collaborations on research or projects.</li>

            <li className="list-group-item"> <b>Patient Care Improvement</b>: Enhance patient outcomes by sharing strategies and insights that have proven effective in similar situations.</li>

            <li className="list-group-item"> <b>Confidential Environment</b>: Discuss sensitive topics and cases in a secure space, ensuring confidentiality and professionalism.</li>

          </ul>
        </div>
      </div>
    </main>
  );
}
