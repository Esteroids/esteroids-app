import Version from './Version'

function About() {
  return (
    <div className='container info-page'>
      <div className='row py-3 px-3 info-body'>
        <div>
          <h2 className='text-primary'> About </h2>
          <p>Esteroids (esteroids.eth) is a community search engine for .eth websites! </p>

          <p>
            While the .eth web previously offered a variety of innovative .eth websites, it lacked the tools to collect,
            explore and showcase these websites to the community.
          </p>

          <p>
            We, therefore, launched esteroids.eth in April 2021 in order to give .eth websites a dedicated search
            engine.{' '}
          </p>

          <p>
            We see the .eth web as a fundamental piece of future Ethereum, and a community search engine as a
            fundamental infrastructure for this web.
          </p>

          <h3 className='text-primary'>What are .eth websites?</h3>

          <p>
            The focus of our search engine is .eth websites. These are decentralized websites that are based on a
            decentralized name service (ENS) and decentralized storage (IPFS).
          </p>

          <p>
            Unlike other websites, these decentralized websites end with &apos;.eth&apos; earning them the name
            &quot;.eth websites&quot; (or dot-eth-websites).
          </p>

          <p>
            Three important properties of .eth websites are that they are private, robust, and censorship-resistance.
            Let&apos;s see what each of those properties means:
          </p>

          <p>
            <u>Privacy</u>: .eth websites are private to use. ENS+IPFS are decentralized networks, therefore using the
            websites you don&apos;t directly interact with their owner.
          </p>

          <p>
            <u>Robust</u>: it&apos;s difficult to take down .eth websites since it&apos;s difficult to take down
            peer-to-peer networks.
          </p>

          <p>
            <u>Censorship-resistance</u>: For the same reason, it&apos;s difficult to censor or block .eth websites.
          </p>

          <p>
            A fourth important property is that .eth websites can be community websites. This happens when an on-chain
            community collectively owns an ENS name that has a .eth website.
          </p>

          <p>
            Our mission is to make esteroids.eth into a community search engine, meaning it will be a .eth search engine
            owned and governed by the .eth web community.{' '}
          </p>

          <h3 className='text-primary'>More from the Esteroids group</h3>
          <ul>
            <li>
              <a href='https://dwebservices.xyz/' target='_blank' rel='noreferrer'>
                dWeb Services
              </a>
              . An IPNS pinning service for the .eth websites community.
            </li>
            <li>
              <a href='https://twitter.com/dwebsitesbot/' target='_blank' rel='noreferrer'>
                New .eth websites bot
              </a>
            </li>
            <li>
              <a href='https://citadef.eth.limo/' target='_blank' rel='noreferrer'>
                Citadef
              </a>
              . An experimental WaCkY .eth blogging democratic autonomous platform
            </li>
          </ul>

          <p className='text-success'>
            <svg width='24' height='24' version='2.0' fill='#000000' alt='Twitter'>
              <use href='#twitter' />
            </svg>
            {' '}Follow us in{' '}
            <a href='https://twitter.com/e_steroids' target='_blank' rel='noreferrer'>
              Twitter
            </a>
          </p>

          <p className='text-success'>
            ✉️ Write us in{' '}
            <a href='mailto:contact@esteroids.xyz' target='_blank' rel='noreferrer'>
              contact@esteroids.xyz
            </a>
            .
          </p>
          <Version />
        </div>
      </div>
    </div>
  )
}

export default About
