import styled from 'styled-components';

export default function PostLink({data}) {
  const { title, description, url, image } = data;

  return (
    <Style href={url} target="_blank">
      <div className="preview-content">
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
        <div className="url">{url}</div>
      </div>
      <img className="preview-img" src={image} alt="" />
    </Style>
  );
}

export const Style = styled.a`
  min-width: 380px;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
  padding: 20px;

  display: flex;
  position: relative;

  .preview-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: calc(100% - 155px);
    word-break: break-word;

    * {
      font-weight: 400;
      color: #CECECE;
      font-size: 11px;
    }

    .title {
      font-size: 16px;
    }

    .desc {
      color: #9B9595;
      line-height: 13px;
    }
  }

  .preview-img {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 0 11px 11px 0;

    width: 155px;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width:611px) {
    min-width: unset;
  }
  
`;