import { oAuthLogin } from '@/utils/actions/auth'
import Image from 'next/image';
import GoogleLogo from '../dist/icons/google.png'
import DiscussionCard from '@/components/DiscussionCard';
import VerificationCard from '@/components/VerificationCard';

export default function Home() {

  const data = { creator: { name: 'maran' }, timestamp: "12345", heading: 'crt ruiweb jbrhfel ighhheru uiref irwfk crt ruiweb jbrhfel iurewfbk Dolores molestiae quod facilis fugiat rerum voluptas suscipit praesentium iste', explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque adipisci quia, molestiae laborum enim in mollitia sit ratione harum, placeat, eligendi natus? Distinctio, maiores iste. Dignissimos animi sit vero, autem, officiis id, ab asperiores eaque expedita officia recusandae dolorum ipsa quos corporis beatae! Voluptatibus non doloribus harum est repellat? Quidem cumque fugiat ullam accusantium expedita sunt consequatur, minus qui placeat explicabo est itaque recusandae veritatis maxime tenetur quibusdam ipsum tempore eaque neque quis amet! Libero eaque, ut iusto id ducimus quos a voluptatum eius? Vel similique quas odio quae autem, consectetur aliquid suscipit quasi voluptatem consequatur, repellendus voluptatum non tenetur quos quis temporibus commodi enim iste quo pariatur ducimus veniam eius repellat. Suscipit molestiae dolorem cum adipisci. Rerum dolorem nobis possimus in dolorum expedita ipsa repudiandae ea consequuntur velit. Quos optio, tenetur enim magni corporis voluptate porro consequuntur ratione fugiat fuga aut iusto omnis veniam molestias velit laborum laboriosam quisquam eius recusandae rem alias! Inventore natus sapiente quis aspernatur animi quod rerum, impedit consequuntur atque provident rem mollitia temporibus nobis repellat blanditiis ad vero consectetur officiis a dolor iure. Esse quos, ad at aperiam ratione laudantium molestiae hic optio expedita numquam repudiandae, sequi eligendi voluptatibus quasi earum nulla mollitia deleniti neque! Dolores corrupti cum mollitia inventore harum unde nemo voluptates accusantium libero illum doloremque et labore id earum consequatur modi dicta laborum adipisci veritatis, ipsam quam in. Soluta molestiae tenetur labore eius recusandae amet veniam quibusdam facere! Ipsam vel minus, omnis distinctio officiis minima qui sunt dolorem excepturi debitis repudiandae voluptas obcaecati molestiae eum assumenda sint voluptatem sapiente consequatur cupiditate esse voluptatum harum earum fugiat doloribus? Quia cum, temporibus dolorum, omnis vel placeat dicta laborum beatae maxime, velit sed. Accusamus magni quidem, exercitationem quaerat aspernatur facilis quod saepe ipsa consequatur corrupti facere ratione ullam, tempore praesentium. Dolores molestiae quod facilis fugiat rerum voluptas suscipit praesentium iste" }

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
          <DiscussionCard data={data} />
          <DiscussionCard data={data} />
          <DiscussionCard data={data} />
          <DiscussionCard data={data} />
          <DiscussionCard data={data} />
          <DiscussionCard data={data} />
          <VerificationCard />
        </div>
      </div>
    </main>
  );
}
