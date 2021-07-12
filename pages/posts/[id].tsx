import {
  ArrowDownIcon,
  ArrowUpIcon,
  ExternalLinkIcon,
  StarIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
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
    <Center h="100vh">
      <Container maxW="container.sm">
        <Flex mb="6" align="center">
          <Box w="32" mr="2" position="relative">
            <Img rounded="sm" w="auto" src={post?.thumbnail} />
            <a target="_blank" href={post?.url}>
              <ExternalLinkIcon
                position="absolute"
                bottom="2"
                right="2"
                bgGradient="radial(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))"
              />
            </a>
          </Box>
          <Link target="_blank" href={post?.permalink}>
            <Heading size="md">{post?.title}</Heading>
          </Link>
        </Flex>
        <Center>
          <HStack mb="6" spacing="3">
            <Tag>
              <TagLeftIcon as={TimeIcon} />
              {new Date(post!.created_utc.value).toLocaleDateString("en-IN")}
            </Tag>
            <Tag colorScheme="orange">
              <TagLeftIcon as={ArrowUpIcon} />
              {post?.ups}
            </Tag>
            <Tag colorScheme="blue">
              <TagLeftIcon as={ArrowDownIcon} />
              {post?.downs}
            </Tag>
            <Tag>
              <TagLeftIcon as={ExternalLinkIcon} />
              <Link target="_blank" href={`https://reddit.com/r/${post?.subr}`}>
                {"r/" + post?.subr}
              </Link>
            </Tag>
            <Tag>
              <TagLeftIcon as={StarIcon} />
              Rank {post?.ranked}
            </Tag>
          </HStack>
        </Center>
      </Container>
    </Center>
  );
};

export default PostById;
