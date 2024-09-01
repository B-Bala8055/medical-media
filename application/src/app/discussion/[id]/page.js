import ActivityCard from '@/components/ActivityCard'
import DiscussionThread from '@/components/DiscussionThread'
import React from 'react'

const CurrentDiscussion = ({ params }) => {

    return (
        <div className='container container-lg'>
            <div className="row mt-4">
                <div className="col col-12 col-md-8">
                    <div className="row">
                        <div className="col-2 col-lg-1 d-flex flex-column justify-content-center mb-2">
                            <button className="btn btn-light btn-sm">&#x25B2;</button>
                            <h4 className='text-center mt-1 mb-1'>35k</h4>
                            <button className="btn btn-light btn-sm">&#x25BC;</button>
                        </div>
                        <div className="col-10 col-lg-11">
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, atque dolorum. Sint adipisci eum eius delectus eos aperiam fugit ut?</h4>
                        </div>
                    </div>

                    <p className='mb-1' style={{ textAlign: 'justify' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt, perferendis nulla, atque maxime ea accusantium illum neque quos nisi itaque vel laboriosam, ut et veritatis maiores doloribus dicta corporis dignissimos necessitatibus similique ipsum iusto. A libero optio, blanditiis rerum in est nisi, voluptates magni vero velit quo molestias obcaecati nobis nostrum architecto reprehenderit dolorem. Error asperiores inventore eius fuga dolor earum, ad consectetur, facere adipisci quaerat amet aliquam alias sint eos voluptatibus aliquid placeat consequatur exercitationem neque quidem voluptatem reiciendis provident, voluptates minima? Eligendi, ipsum. Ea vitae nostrum, necessitatibus deleniti ab, quos tenetur nihil minima velit, error ratione facilis natus!</p>
                    <div className='d-flex align-items-center' style={{ height: '40px' }}>
                        <button className='btn btn-link btn-sm'>Comment</button>
                        <button className='btn btn-link btn-sm'>Share</button>
                        <small className='ms-auto pt-5 pb-5 text-muted'>Rishikesh Posted on 12/02/2024</small>
                    </div>
                    <hr />
                    <DiscussionThread />
                    <DiscussionThread />
                    <DiscussionThread />
                    <DiscussionThread />
                </div>
                <div className="col col-12 col-md-4">
                    <h4>Related</h4>
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                </div>
            </div>
        </div>
    )
}

export default CurrentDiscussion