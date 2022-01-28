import Image from 'components/atoms/image';

/**
 * Renders the backdrop of a page.
 * Used in 404 and Search pages.
 * @param {*} backdropImage - The path of the backdrop image
 * @param {*} mainText - Main text for the backdrop
 * @param {*} mainTextClassName - Additional classΝames to be passed to the main text
 * @param {*} subText - Secondary text for the backdrop
 * @param {*} subTextClassName - Additional classΝames to be passed to the secondary text
 */
const PageBackdrop = ({
  backdropImage,
  mainText,
  mainTextClassName = '',
  subText,
  subTextClassName = '',
  children,
}) => (
  <div className='page-backdrop relative box-border f-center txt-050'>
    <Image src={backdropImage} />
    <p className={`f-center mx-auto mb-3 mt-8 ${mainTextClassName}`}>
      {mainText}
    </p>
    {subText ? (
      <p className={`my-2 mx-auto f-center ${subTextClassName}`}>{subText}</p>
    ) : null}
    {children}
  </div>
);

export default PageBackdrop;
