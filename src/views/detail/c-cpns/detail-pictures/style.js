import styled from "styled-components";

export const PicturesWrapper = styled.div`
  /* position: relative; */
  position: absolute;
  top: 48px;

  > .pictures {
    display: flex;
    height: 600px;
    background-color: #000;

    /* 如果整个 pictures处于hover状态, 那么就找到它里面所有的cover,让cover的 opacity为1 
       为了确保可以把它覆盖的话,给它加了一个 !important
       这里使用的是排它思想, 利用CSS的层叠特性
    */
    &:hover { 
      .cover {
        opacity: 1 !important;
      }

      /** 当前正在处于hover状态的item, 它的opacity依然为:0 */
      .item:hover {
        .cover {
          opacity: 0 !important;
        }
      }
    }
  }

  .left, .right {
    width: 50%;
    height: 100%;

    .item {
      position: relative;
      height: 100%;
      overflow: hidden;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        transition: transform 0.3s ease-in;
      }

      .cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        transition: opacity 200ms ease;
      }

      &:hover {
        img {
          transform: scale(1.08);
        }
      }
    }
  }

  .right {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 50%;
      height: 50%;
      box-sizing: border-box;
      border: 1px solid #000;
    }
  }

  .show-btn {
    position: absolute;
    z-index: 99;
    right: 15px;
    bottom: 15px;
    line-height: 22px;
    padding: 6px 15px;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
  }
`