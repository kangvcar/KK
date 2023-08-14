import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useConfig } from '@/lib/config'
import { useLocale } from '@/lib/locale'
import useTheme from '@/lib/theme'

const NavBar = () => {
  const BLOG = useConfig()
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true, external: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to} target={link.external ? '_blank' : null}>{link.name}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

export default function Header ({ navBarTitle, fullWidth }) {
  const BLOG = useConfig()
  const { dark } = useTheme()

  // Favicon

  const resolveFavicon = fallback => !fallback && dark ? '/favicon.dark.png' : '/favicon.png'
  const [favicon, _setFavicon] = useState(resolveFavicon())
  const setFavicon = fallback => _setFavicon(resolveFavicon(fallback))

  useEffect(
    () => setFavicon(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dark]
  )

  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const sentinelRef = useRef(/** @type {HTMLDivElement} */ undefined)
  const handler = useCallback(([entry]) => {
    if (useSticky && navRef.current) {
      navRef.current?.classList.toggle('sticky-nav-full', !entry.isIntersecting)
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }, [useSticky])

  useEffect(() => {
    const sentinelEl = sentinelRef.current
    const observer = new window.IntersectionObserver(handler)
    observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [handler, sentinelRef])

  const titleRef = useRef(/** @type {HTMLParagraphElement} */ undefined)

  function handleClickHeader (/** @type {MouseEvent} */ ev) {
    if (![navRef.current, titleRef.current].includes(ev.target)) return

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinelRef}></div>
      <div
        className={`sticky-nav group m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
        onClick={handleClickHeader}
      >
        {/* <svg
          viewBox="0 0 24 24"
          className="caret w-6 h-6 absolute inset-x-0 bottom-0 mx-auto pointer-events-none opacity-30 group-hover:opacity-100 transition duration-100"
        >
          <path
            d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
            className="fill-black dark:fill-white"
          />
        </svg> */}
        <svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">      <defs>  <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">    <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology"/>    <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>    <feComposite in="flood" in2="morphology" operator="in" result="composite"/>    <feMerge result="merge">          <feMergeNode in="composite" result="mergeNode"/>      <feMergeNode in="SourceGraphic" result="mergeNode1"/>      </feMerge>  </filter></defs>      <g id="notion-avatar" filter="url(#filter)">        <g id="notion-avatar-face" fill="#ffffff">      <title>Face/ 4</title>    <g id="Face/-4" stroke="none" stroke-width="1" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">        <path d="M532,379 C664.54834,379 772,486.45166 772,619 C772,751.54834 764.54834,899 592,899 C462.715227,899 358.747776,816.220491 314.739381,718.954345 C313.831676,718.98455 312.917642,719 312,719 C267.81722,719 232,683.18278 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813" id="Path" stroke="#000000" stroke-width="24"/>    </g>    </g><g id="notion-avatar-nose">      <g id="Nose/ 13"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M644 560C644 560 665.892 613.522 673 623C676 627 693.906 641.256 692.774 653.58C690.065 683.076 644 684.359 644 684.359C644 684.359 700 689.489 700 653.58C700 637.222 687 632 674 620C666.959 613.5 644 560 644 560Z" fill="black" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>    </g><g id="notion-avatar-mouth">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Mouth/ 1</title>    <g id="Mouth/-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">        <path d="M549,759 C575.12979,773.666667 603.12979,781 633,781 C662.87021,781 682.87021,773.666667 693,759" id="Path" stroke="#000000" stroke-width="16"/>    </g>    </g><g id="notion-avatar-eyes">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Eyes/ 7</title>    <g id="Eyes/-7" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">        <path d="M570,516 C578.836556,516 586,526.745166 586,540 C586,553.254834 578.836556,564 570,564 C561.163444,564 554,553.254834 554,540 C554,526.745166 561.163444,516 570,516 Z M708,516 C716.836556,516 724,526.745166 724,540 C724,553.254834 716.836556,564 708,564 C699.163444,564 692,553.254834 692,540 C692,526.745166 699.163444,516 708,516 Z M568,527 C564.686292,527 562,529.686292 562,533 C562,536.313708 564.686292,539 568,539 C571.313708,539 574,536.313708 574,533 C574,529.686292 571.313708,527 568,527 Z M706,527 C702.686292,527 700,529.686292 700,533 C700,536.313708 702.686292,539 706,539 C709.313708,539 712,536.313708 712,533 C712,529.686292 709.313708,527 706,527 Z" id="Combined-Shape" fill="#000000"/>    </g>    </g><g id="notion-avatar-eyebrows">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Eyebrows/ 0</title>    <g id="Eyebrows/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">        <g id="Group" transform="translate(525.000000, 492.000000)" stroke="#000000" stroke-width="16">            <path d="M0,16 C12.8888889,5.33333333 27.8888889,0 45,0 C62.1111111,0 77.1111111,5.33333333 90,16" id="Path"/>            <path d="M138,16 C150.888889,5.33333333 165.888889,0 183,0 C200.111111,0 215.111111,5.33333333 228,16" id="Path"/>        </g>    </g>    </g><g id="notion-avatar-glasses">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Glasses/ 3</title>    <g id="Glasses/-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">        <g id="Group" transform="translate(293.000000, 488.000000)" stroke="#000000" stroke-width="8">            <path d="M197.493245,10.4280671 C174.636102,27.3582996 188.604356,103.544346 244.477372,103.544346 C300.350388,103.544346 337.149222,42.6997481 325.747213,20.1024857 C314.345204,-2.49477675 220.350388,-6.50216547 197.493245,10.4280671 Z" id="Path"/>            <path d="M376.540864,10.4280671 C353.683721,27.3582996 367.651975,103.544346 423.524991,103.544346 C479.398007,103.544346 516.196841,42.6997481 504.794832,20.1024857 C493.392823,-2.49477675 399.398007,-6.50216547 376.540864,10.4280671 Z" id="Path" transform="translate(436.458153, 51.772173) scale(-1, 1) translate(-436.458153, -51.772173) "/>            <line x1="301.285714" y1="5.44186047" x2="392.714286" y2="5.44186047" id="Path"/>            <line x1="326.68254" y1="21.1627907" x2="367.31746" y2="21.1627907" id="Path"/>            <line x1="186.554557" y1="30.8015819" x2="1.25992802" y2="69.9860126" id="Path" transform="translate(94.259928, 50.646655) rotate(1.361411) translate(-94.259928, -50.646655) "/>        </g>    </g>    </g><g id="notion-avatar-hair">      <g id="Hairstyle/ 39"><path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M499 255C530.508 267.472 565.59 277.322 605.268 288.553C644.946 299.784 671.888 320.97 700 348C752 398 746.942 484.288 739 493C737.601 494.535 721.325 463.054 700 444L698.615 442.77C675.806 422.637 644.02 400.454 642 402C619.677 419.084 627.675 420.273 595 427C561 434 549.626 424.652 503 416C450.977 410.003 417.977 416.003 404 434C380.296 464.522 392.365 499.147 392.365 516.739C392.365 528.233 383.924 572.725 367.044 650.214L366 655L328.117 564.825H287.146C271.78 507.747 268.106 468.653 276.123 447.542L276.87 445.586L277.655 443.563C279.549 438.724 287.997 432.536 303 425L302.938 423.117C302.412 405.678 303.388 392.143 305.866 382.512L306 382C309.047 370.574 322.517 329.262 388.884 302.935L366.282 283.125C365.857 282.752 365.429 282.376 365 282L366.925 281.942C392.744 281.204 411.769 282.556 424 286C427.172 286.893 430.481 288.094 433.927 289.603C437.049 288.94 440.248 288.307 443.525 287.705L415.064 260.61L418.214 260.777C447.35 262.359 469.109 264.729 483.49 267.887L484 268C493.813 270.195 506.255 274.141 521.325 279.838C525.184 279.731 528.95 279.679 532.631 279.678L499 255Z" fill="black" stroke="black" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>    </g><g id="notion-avatar-accessories">      <g id="Accessories/ 14"><g id="Group"><path id="Path" d="M287.695 658.293C276.76 647.358 276.76 629.63 287.695 618.695C298.63 607.76 316.358 607.76 327.293 618.695C337.267 628.669 338.143 644.297 329.921 655.264L362.083 687.426C366.925 692.268 366.925 700.119 362.083 704.962C357.24 709.804 349.389 709.804 344.547 704.962L306.04 666.456C299.371 666.111 292.792 663.389 287.695 658.293Z" fill="white" stroke="black" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><rect id="Rectangle" width="8" height="16" rx="4" transform="matrix(-0.707107 0.707107 0.707107 0.707107 295.615 623.221)" fill="black"/></g></g>    </g><g id="notion-avatar-details">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Details/ 3</title>    <g id="Details/-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">        <path d="M491.752948,639.020916 L486.914511,658.42683 M511.752948,639.020916 L506.914511,658.42683 M531.752948,639.020916 L526.914511,658.42683 M789.247052,639.020916 L794.085489,658.42683 M769.247052,639.020916 L774.085489,658.42683 M749.247052,639.020916 L754.085489,658.42683" id="Combined-Shape" stroke="#000000" stroke-width="12"/>    </g>    </g><g id="notion-avatar-beard">      <!--?xml version="1.0" encoding="UTF-8"?-->    <title>Beard/ 0</title>    <g id="Beard/-0" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"/>    </g>      </g>      </svg>
        <div className="flex items-center">
          <Link href="/" aria-label={BLOG.title}>
            <Image
              src={favicon}
              width={24}
              height={24}
              alt={BLOG.title}
              onError={() => setFavicon(true)}
            />
          </Link>
          <HeaderName
            ref={titleRef}
            siteTitle={BLOG.title}
            siteDescription={BLOG.description}
            postTitle={navBarTitle}
            onClick={handleClickHeader}
          />
        </div>
        <NavBar />
      </div>
    </>
  )
}

const HeaderName = forwardRef(function HeaderName ({ siteTitle, siteDescription, postTitle, onClick }, ref) {
  return (
    <p
      ref={ref}
      className="header-name ml-2 font-medium text-gray-600 dark:text-gray-300 capture-pointer-events grid-rows-1 grid-cols-1 items-center"
      onClick={onClick}
    >
      {postTitle && <span className="post-title row-start-1 col-start-1">{postTitle}</span>}
      <span className="row-start-1 col-start-1">
        <span className="site-title">{siteTitle}</span>
        <span className="site-description font-normal">, {siteDescription}</span>
      </span>
    </p>
  )
})
