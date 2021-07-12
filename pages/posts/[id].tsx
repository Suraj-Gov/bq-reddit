import { TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Heading,
  Tag,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { baseUrl } from "../../constants";
import { PostI, postRequestI } from "../../types";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { params } = ctx;
  try {
    const { data } = await axios.post<{ rows: PostI[] }>(
      `${baseUrl}/api/posts`,
      {
        single: true,
        id: params!.id,
      } as postRequestI
    );
    return {
      props: {
        post: data.rows[0],
      },
    };
  } catch (err) {
    return {
      props: {
        errorCode: err.response.status,
        error: JSON.stringify(err, null, 2),
      },
    };
  }
}

const PostById: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post, error, errorCode }) => {
  if (error) {
    return (
      <Box>
        <Heading>{errorCode}</Heading>
        <pre>{error}</pre>
      </Box>
    );
  }

  return (
    <Container maxW="container.sm">
      <Heading>{post?.title}</Heading>
      <Tag>
        <TagLeftIcon as={TimeIcon} />
        {new Date(post!.created_utc.value).toLocaleDateString("en-IN")}
      </Tag>
      <Text>{post?.subr}</Text>
    </Container>
  );
};

export default PostById;
