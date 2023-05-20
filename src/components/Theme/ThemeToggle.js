import { useDarkThemeDispatchContext, useDarkThemeContext } from '../contexts/DarkTheme'

const ThemeToggle = () => {
  const setDarkTheme = useDarkThemeDispatchContext()
  const darkTheme = useDarkThemeContext()

  return (
    <div className='wrapper d-flex mx-2'>
      <label className='switch'>
        <input
          type='checkbox'
          id='checkbox-toggle'
          checked={darkTheme}
          onClick={() => {
            setDarkTheme(!darkTheme)
          }}
          readOnly={true}
        />
        <span className='slider d-flex flex-row align-items-center'>
          <svg
            className='ml-2'
            width='21'
            height='20'
            viewBox='0 0 21 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_471_50296)'>
              <path
                d='M16.5506 10.0023C16.5482 13.1892 14.0061 15.7258 10.8276 15.7258C7.60506 15.7258 5.11066 13.0176 5.13092 9.93149C5.15118 7.04092 7.44298 4.21635 10.8527 4.21875C14.2659 4.22115 16.6316 7.07092 16.5506 10.0023ZM10.8527 5.52665C8.3678 5.52425 6.42996 7.46449 6.42639 9.95549C6.42281 12.4597 8.3678 14.4299 10.8443 14.4323C13.3161 14.4335 15.2658 12.4789 15.2706 9.99509C15.2742 7.47409 13.3518 5.52905 10.8527 5.52665Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M15.6938 5.7763C15.4233 5.7763 15.2541 5.62511 15.1349 5.39833C15.0086 5.15835 15.03 4.91357 15.2064 4.72999C15.8261 4.08564 16.4768 3.47249 17.1526 2.88933C17.3611 2.70935 17.6948 2.75014 17.8951 2.92653C18.1048 3.11131 18.162 3.43889 18.025 3.69087C17.9868 3.76046 17.9403 3.82766 17.8855 3.88285C17.3349 4.44201 16.7819 4.99876 16.2277 5.55432C16.0812 5.70071 15.9036 5.7787 15.6938 5.7763Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M4.26944 17.2198C4.04658 17.215 3.84636 17.1298 3.72599 16.9031C3.60085 16.6679 3.60324 16.4207 3.78201 16.2335C4.3922 15.5952 5.01073 14.9664 5.64476 14.3533C5.86643 14.1385 6.30501 14.1913 6.51714 14.4049C6.73882 14.628 6.76861 14.9868 6.52668 15.2424C5.94032 15.8615 5.33251 16.4603 4.72709 17.0614C4.61268 17.1766 4.45417 17.2174 4.26944 17.2198Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M11.4892 1.8912C11.4892 2.29077 11.4939 2.69034 11.488 3.08871C11.4808 3.48707 11.2127 3.77865 10.8587 3.78585C10.4952 3.79305 10.2116 3.49307 10.2092 3.07791C10.2032 2.28957 10.2032 1.50123 10.2092 0.711697C10.2104 0.29893 10.4928 -0.00344584 10.8527 0.000153872C11.2139 0.00375358 11.4832 0.304929 11.488 0.722496C11.4939 1.11246 11.4892 1.50123 11.4892 1.8912Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M11.4902 18.127C11.4902 18.5062 11.4926 18.8854 11.4891 19.2645C11.4855 19.7097 11.2233 20.0037 10.8419 20.0001C10.4737 19.9965 10.2091 19.7049 10.2067 19.2801C10.2019 18.5026 10.2019 17.7239 10.2067 16.9463C10.2103 16.5 10.476 16.2204 10.8693 16.23C11.24 16.2384 11.4795 16.5204 11.4879 16.9607C11.4879 16.9703 11.4879 16.9811 11.4879 16.9907C11.4902 17.3687 11.4902 17.7479 11.4902 18.127Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M2.84396 9.33633C3.23009 9.33633 3.61623 9.33033 4.00356 9.33753C4.42068 9.34593 4.69241 9.59431 4.70433 9.95788C4.71505 10.3095 4.43737 10.6094 4.03693 10.6178C3.22533 10.6334 2.41253 10.6334 1.59974 10.6178C1.21956 10.6106 0.939489 10.3131 0.938297 9.97708C0.937105 9.62671 1.22909 9.34713 1.62596 9.33873C2.03116 9.32913 2.43756 9.33633 2.84396 9.33633Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M18.9389 9.33536C19.3251 9.33536 19.7112 9.33056 20.0985 9.33656C20.518 9.34376 20.816 9.61614 20.816 9.97611C20.8148 10.3229 20.524 10.6133 20.1247 10.6193C19.3322 10.6325 18.5397 10.6325 17.7471 10.6193C17.3276 10.6121 17.0404 10.3205 17.0511 9.95691C17.0631 9.58254 17.3407 9.34376 17.7805 9.33416C17.9783 9.32936 18.1762 9.33296 18.3752 9.33296C18.5623 9.33536 18.7506 9.33536 18.9389 9.33536Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M6.08684 5.77747C5.84014 5.77987 5.6578 5.69227 5.50525 5.53389C4.97371 4.98193 4.4398 4.43358 3.91422 3.87442C3.627 3.56845 3.627 3.18808 3.89277 2.9409C4.14543 2.70572 4.51726 2.72611 4.79971 3.00689C5.36462 3.56845 5.92356 4.1336 6.48132 4.70235C6.67915 4.90394 6.74828 5.14392 6.6291 5.4151C6.52184 5.66228 6.32162 5.76787 6.08684 5.77747Z'
                fill='#8E9FE0'
              ></path>
              <path
                d='M17.4338 17.2199C17.2419 17.2271 17.0894 17.1443 16.9583 17.0111C16.4053 16.4532 15.8487 15.9 15.3005 15.3373C15.0014 15.0301 14.9835 14.6677 15.2373 14.4038C15.4948 14.1362 15.8737 14.1566 16.1836 14.4662C16.739 15.0205 17.292 15.5785 17.8426 16.1388C18.0404 16.3392 18.1131 16.5792 17.9975 16.8504C17.8914 17.0987 17.6924 17.2079 17.4338 17.2199Z'
                fill='#8E9FE0'
              ></path>
            </g>
            <defs>
              <clipPath id='clip0_471_50296'>
                <rect width='19.8765' height='20' fill='white' transform='translate(0.938293)'></rect>
              </clipPath>
            </defs>
          </svg>
          <svg
            className='ml-4-4'
            width='21'
            height='20'
            viewBox='0 0 21 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.81185 20C6.01388 19.7941 2.88134 17.7653 0.984853 13.8266C0.795204 13.4316 0.791877 13.07 1.08633 12.7436C1.39243 12.4038 1.77672 12.4373 2.15935 12.5896C3.30556 13.0432 4.49169 13.2575 5.72608 13.2407C9.61388 13.1855 13.2072 10.082 13.871 6.22366C14.1655 4.51459 13.9875 2.87414 13.352 1.27053C13.1041 0.644481 13.4019 0.0887396 13.9941 0.00839135C14.1954 -0.0183914 14.3784 0.0385219 14.5547 0.122218C17.9584 1.71746 20.0313 4.36059 20.5486 8.11519C21.0028 11.4044 20.1078 14.3338 17.8287 16.766C15.8107 18.9204 13.2904 19.9716 9.81185 20ZM15.671 2.80886C15.8141 3.89524 15.8623 4.91633 15.7326 5.94579C15.0272 11.5735 9.79188 15.6344 4.17229 14.9046C4.06914 14.8912 3.93606 14.8209 3.87118 14.9448C3.81794 15.0452 3.93273 15.1172 3.99262 15.1875C5.47487 16.9016 7.32977 17.9511 9.57894 18.1503C12.447 18.4048 14.8825 17.444 16.8205 15.2712C20.1144 11.5752 19.6137 5.81857 15.671 2.80886Z'
              fill='#8E9FE0'
            ></path>
          </svg>
        </span>
      </label>
    </div>
  )
}

export default ThemeToggle
