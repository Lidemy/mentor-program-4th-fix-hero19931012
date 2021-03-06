/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { getPost } from '../../WebAPI'

const Root = styled.div``
const PostContainer = styled.div`
  width: 600px;
  margin: 20px auto 0 auto;
  padding: 20px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`
const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px 0;
`

const PostTitle = styled.div`
  font-size: 36px;
  color: #555;
`

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
`
const PostAuthor = styled.div`
  margin: 10px 10px 0 0;
  font-size: 16px;
  color: #aaa;
`

const PostTime = styled(PostAuthor)``
const PostContent = styled.div`
  padding: 20px 0;
  color: #555;
  word-break: break-word;
`

function PostPage() {
  const [post, setPost] = useState({})
  const [author, setAuthor] = useState(null)
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((post) => {
      setPost(post);
      setAuthor(post.user.nickname);
    })
  }, [])

  return (
    <Root>
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostInfoContainer>
            {author && <PostAuthor>{`作者：${author}`}</PostAuthor>}
            <PostTime>{post.createdAt && new Date(post.createdAt).toLocaleString()}</PostTime>
          </PostInfoContainer>
        </PostHeader>
        <PostContent>{post.body}</PostContent>
      </PostContainer>
    </Root>
  );
}

export default PostPage;
