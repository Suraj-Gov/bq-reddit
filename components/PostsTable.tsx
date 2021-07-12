import {
  ExternalLinkIcon,
  AddIcon,
  MinusIcon,
  TriangleUpIcon,
  TriangleDownIcon,
} from "@chakra-ui/icons";
import {
  chakra,
  HStack,
  Link,
  Table,
  TableCaption,
  Tag,
  TagLeftIcon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import * as NextLink from "next/link";
import { orderByRowI, PostI } from "../types";
import { baseUrl } from "../constants";

interface props {
  postsData: PostI[];
  orderByRow: {
    row: string;
    order: boolean;
  };
  setOrderByRow: Dispatch<SetStateAction<orderByRowI>>;
}

const PostsTable: React.FC<props> = ({
  orderByRow,
  postsData,
  setOrderByRow,
}) => {
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
          {[
            { text: "Created On", rowId: "created_utc" },
            { text: "Title", rowId: "title" },
            { text: "Subreddit", rowId: "subr" },
            { text: "Attached Link" },
            { text: "Upvotes", rowId: "ups" },
            { text: "Downvotes", rowId: "downs" },
            { text: "Author", rowId: "author" },
          ].map((i, idx) => (
            <Th
              key={idx}
              cursor="pointer"
              onClick={() => i.rowId && setOrder(i.rowId)}
            >
              {i.text}
              {i.rowId === orderByRow.row ? (
                orderByRow.order ? (
                  <TriangleUpIcon ml="2" />
                ) : (
                  <TriangleDownIcon ml="2" />
                )
              ) : (
                <></>
              )}
            </Th>
          ))}
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
                {/* <Td width="2">
                  {!["default", "self", "nsfw"].some(
                    (i) => i === post.thumbnail
                  ) && <Img src={post.thumbnail} />}
                </Td> */}
                <Td maxWidth="96">
                  <HStack spacing="2">
                    <Tooltip label={post.title} openDelay={1000}>
                      <Text
                        sx={{ display: "inline-block" }}
                        maxWidth={["72", "80", "96"]}
                        isTruncated
                      >
                        <Link
                          target="_blank"
                          href={`${baseUrl}/posts/${post.id}`}
                        >
                          {post.title}
                        </Link>
                      </Text>
                    </Tooltip>
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
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default PostsTable;
