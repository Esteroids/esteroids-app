import LandingPageImg from '../images/esteroids_3_logos.png'
import MainLayout from './MainLayout/MainLayout'

function PrivacyPolicy({ searchTerm, setSearchTerm }) {
  return (
    <MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
      <div className='container  info-page'>
        <div className='row py-3 px-3 info-body'>
          <div className='col-md-6'>
            <h2> Privacy Statement </h2>
            <p>
              At Esteroids, accessible from esteroids.eth, one of our main priorities is the privacy of our dWebsite
              visitors.
            </p>

            <p>
              This Privacy Policy discloses the type of information that is collected and recorded by Esteroids and how
              we use it.
            </p>

            <p className='text-success'>
              <b>
                ✉️ If you have additional questions or require more information about our Privacy Policy, do not
                hesitate to contact us by email at contact@esteroids.xyz.
              </b>
            </p>
            <h3>Log files</h3>

            <p>The website esteroids.eth is a decentralized website, built on top of ENS and IPFS technologies.</p>

            <p>
              When visiting esteroids.eth you connect to Esteroids IPFS node. We do not collect or save any private
              information of connections to Esteroids IPFS node, but we do collect anonymized statistics like the number
              of users connected to Esteroids IPFS node over time, how many people see each page in Esteroids, or which
              tools are used to visit Esteroids.
            </p>

            <p>
              Your visit is completely private as far as Esteroids is concerned, we do not save your personal
              information.
            </p>

            <p>
              However, you should keep in mind that Esteroids is served using ENS and IPFS. Make sure to check the
              privacy policies of ENS and IPFS to get the full picture of accessing Esteroids.
            </p>

            <p>The website esteroids.eth does not use any third-party ad servers, ad networks, or cookies.</p>
            <h3>Third Party Privacy Policies</h3>

            <p>The website esteroids.eth does not use third parties.</p>
            <h3>Children’s Information</h3>

            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage
              parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <h3>Online Privacy Policy Only</h3>

            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to the website
              esteroids.eth with regard to the information shared and/or collected on eSteroids. This policy is not
              applicable to any information collected offline or via channels other than esteroids.eth.
            </p>
          </div>{' '}
          {/* col-md-6 */}
          <div className='col-md-6 text-center d-none d-sm-block'>
            <img src={LandingPageImg} alt='The logo of Esteroids in three different colors' />
          </div>{' '}
          {/* col-md-6 */}
        </div>
      </div>
    </MainLayout>
  )
}

export default PrivacyPolicy
