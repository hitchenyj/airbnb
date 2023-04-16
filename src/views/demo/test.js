.preview {
  display: flex;
  justify-content: center;
  height: 100px;
  margin-top: 10px;

  .info {
    position: absolute;
    bottom: 10px;
    max-width: 105vh;
    color: #fff;

    .desc {
      display: flex;
      justify-content: space-between;

      .toggle {
        cursor: pointer;
      }
    }

    .list {
      margin-top: 3px;
      overflow: hidden;
      transition: height 300ms ease;

      .item {
        margin-right: 15px;
        cursor: pointer;

        img {
          height: 67px;
          opacity: 0.5;
        }

        &.active {
          img {
            opacity: 1;
          }
        }
      }
    }
  }
}