import { useQuery, useQueryClient } from "react-query";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Container, SlideFade } from "@chakra-ui/react";
import PostsTable from "../components/PostsTable";
import Paginator from "../components/Paginator";
import LoadingIndicator from "../components/LoadingIndicator";
import { orderByRowI, PostI, postRequestI } from "../types";

interface props {}

const getPosts = async (limit: number, offset: number) => {
  const { data } = await axios.post("/api/posts", {
    limit,
    offset,
  });
  return data.rows;
};

const getOrderedPosts = async (
  limit: number,
  offset: number,
  orderByRow: orderByRowI
) => {
  if (orderByRow.row === "") {
    return null;
  }
  const { data } = await axios.post<{ rows: PostI }>("/api/posts", {
    limit,
    offset,
    orderBy: orderByRow.row,
    orderDir: orderByRow.order ? "asc" : "desc",
  } as postRequestI);
  return data.rows;
};

const Index: React.FC<props> = () => {
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [orderByRow, setOrderByRow] = useState({
    row: "",
    order: false,
  });
  const rowCountRef = useRef(-1);
  // true for asc, false for desc, null for unordered

  useEffect(() => {
    const run = async () => {
      const { data } = await axios.post("/api/posts", {
        count: true,
      });
      rowCountRef.current = data.count;
    };
    run();
  }, []);

  const queryClient = useQueryClient();
  const {
    isLoading: isLoadingAllPosts,
    error: postsFetchError,
    isError: isPostsFetchError,
    data: postsData,
    isFetching: isFetchingMorePosts,
  } = useQuery(["postsFetch", limit, offset], () => getPosts(limit, offset), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isLoadingOrderedPosts,
    error: orderedPostsFetchError,
    isError: isOrderedPostsFetchError,
    data: orderedPostsData,
    isFetching: isFetchingOrderedPostsData,
  } = useQuery(
    ["orderBy", limit, offset, orderByRow],
    () => getOrderedPosts(limit, offset, orderByRow),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  if (isPostsFetchError || orderedPostsFetchError) {
    return (
      <pre>{JSON.stringify(postsFetchError || orderedPostsFetchError)}</pre>
    );
  }

  return (
    <Container position="relative" maxW="90vw">
      {(isLoadingAllPosts ||
        isFetchingMorePosts ||
        isLoadingOrderedPosts ||
        isFetchingOrderedPostsData) && <LoadingIndicator />}
      <SlideFade in={!isLoadingAllPosts}>
        {!isLoadingAllPosts && (
          <PostsTable
            orderByRow={orderByRow}
            setOrderByRow={setOrderByRow}
            postsData={orderByRow.row === "" ? postsData : orderedPostsData}
          />
        )}
        <Paginator
          rowCount={rowCountRef.current}
          setOffset={setOffset}
          intervalVal={limit}
          offsetVal={offset}
        />
      </SlideFade>
    </Container>
  );
};

export default Index;
