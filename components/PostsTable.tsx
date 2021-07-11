import { ExternalLinkIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  chakra,
  HStack,
  Img,
  Table,
  TableCaption,
  Tag,
  TagLeftIcon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { orderByRowI, PostI } from "../types";
import LoadingIndicator from "./LoadingIndicator";

interface props {
  postsData: PostI[];
  setOrderByRow: Dispatch<SetStateAction<orderByRowI>>;
}

const PostsTable: React.FC<props> = ({ postsData, setOrderByRow }) => {
  const setOrder = (row: string) => {
    setOrderByRow((prev) => ({
      row,
      order: prev.row === row ? !prev.order : true,
    }));
  };

  return (
    <Table variant="striped">
      <TableCaption placement="top">Reddit Posts</TableCaption>
      <Thead>
        <Tr>
          <Th cursor="pointer" onClick={() => setOrder("created_utc")}>
            Created On
          </Th>
          <Th>Thumbnail</Th>
          <Th cursor="pointer" onClick={() => setOrder("title")}>
            Title
          </Th>
          <Th cursor="pointer" onClick={() => setOrder("subr")}>
            Subreddit
          </Th>
          <Th>Attached Link</Th>
          <Th cursor="pointer" onClick={() => setOrder("ups")}>
            Upvotes
          </Th>
          <Th cursor="pointer" onClick={() => setOrder("downs")}>
            Downvotes
          </Th>
          <Th cursor="pointer" onClick={() => setOrder("author")}>
            Author
          </Th>
          <Th cursor="pointer" onClick={() => setOrder("ranked")}>
            Rank
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {postsData &&
          postsData.map((post: PostI) => {
            return (
              <Tr key={post.id}>
                <Td>
                  {new Date(post.created_utc.value).toLocaleDateString("en-IN")}
                </Td>
                <Td width="2">
                  {!["default", "self", "nsfw"].some(
                    (i) => i === post.thumbnail
                  ) && <Img src={post.thumbnail} />}
                </Td>
                <Td maxWidth="96">
                  <HStack spacing="2">
                    <Text
                      sx={{ display: "inline-block" }}
                      as="u"
                      maxWidth={["72", "80", "96"]}
                      isTruncated
                    >
                      <Link href={`/post/${post.id}`}>
                        <a>{post.title}</a>
                      </Link>
                    </Text>
                    <a target="_blank" href={post.permalink}>
                      <ExternalLinkIcon />
                    </a>
                  </HStack>
                </Td>
                <Td>
                  <chakra.span as="u">
                    <a
                      target="_blank"
                      href={`https://reddit.com/r/${post.subr}`}
                    >
                      r/{post.subr}
                    </a>
                  </chakra.span>
                </Td>
                <Td width="8">
                  <a target="_blank" href={post.url}>
                    <HStack spacing="2">
                      <chakra.span>Media</chakra.span>
                      <ExternalLinkIcon />
                    </HStack>
                  </a>
                </Td>
                <Td>
                  <Tag size="md" colorScheme="orange">
                    <TagLeftIcon as={AddIcon} />
                    {post.ups}
                  </Tag>
                </Td>
                <Td>
                  <Tag size="md" colorScheme="blue">
                    <TagLeftIcon as={MinusIcon} />
                    {post.downs}
                  </Tag>
                </Td>
                <Td>
                  <HStack as="u" spacing="2">
                    <a
                      target="_blank"
                      href={`https://reddit.com/u/${post.author}`}
                    >
                      {post.author}
                    </a>
                    <ExternalLinkIcon />
                  </HStack>
                </Td>
                <Td>{post.ranked}</Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default PostsTable;
