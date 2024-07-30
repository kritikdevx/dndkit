const data = [
  {
    id: "SEGMENT_1",
    type: "SEGMENT",
    text: "Segment 1",
    dishes: [
      { id: "SEGMENT_1_DISH_1", type: "DISH", text: "Dish 1" },
      { id: "SEGMENT_1_DISH_2", type: "DISH", text: "Dish 2" },
      { id: "SEGMENT_1_DISH_3", type: "DISH", text: "Dish 3" },
      { id: "SEGMENT_1_DISH_4", type: "DISH", text: "Dish 4" },
    ],
    childrens: [
      {
        id: "SEGMENT_1_CHILD_SEGMENT_1",
        type: "CHILD_SEGMENT",
        text: "Child Segment 1",
        dishes: [
          { id: "CHILD_SEGMENT_1_DISH_1", type: "DISH", text: "Dish 1" },
          { id: "CHILD_SEGMENT_1_DISH_2", type: "DISH", text: "Dish 2" },
          { id: "CHILD_SEGMENT_1_DISH_3", type: "DISH", text: "Dish 3" },
          { id: "CHILD_SEGMENT_1_DISH_4", type: "DISH", text: "Dish 4" },
        ],
      },
      {
        id: "SEGMENT_1_CHILD_SEGMENT_2",
        type: "CHILD_SEGMENT",
        text: "Child Segment 2",
      },
      {
        id: "SEGMENT_1_CHILD_SEGMENT_3",
        type: "CHILD_SEGMENT",
        text: "Child Segment 3",
      },
      {
        id: "SEGMENT_1_CHILD_SEGMENT_4",
        type: "CHILD_SEGMENT",
        text: "Child Segment 4",
        dishes: [
          { id: "CHILD_SEGMENT_4_DISH_1", type: "DISH", text: "Dish 1" },
          { id: "CHILD_SEGMENT_4_DISH_2", type: "DISH", text: "Dish 2" },
          { id: "CHILD_SEGMENT_4_DISH_3", type: "DISH", text: "Dish 3" },
          { id: "CHILD_SEGMENT_4_DISH_4", type: "DISH", text: "Dish 4" },
        ],
      },
    ],
  },
  {
    id: "SEGMENT_2",
    type: "SEGMENT",
    text: "Segment 2",
    dishes: [
      { id: "SEGMENT_2_DISH_1", type: "DISH", text: "Dish 1" },
      { id: "SEGMENT_2_DISH_2", type: "DISH", text: "Dish 2" },
      { id: "SEGMENT_2_DISH_3", type: "DISH", text: "Dish 3" },
    ],
  },
  {
    id: "SEGMENT_3",
    type: "SEGMENT",
    text: "Segment 3",
  },
  {
    id: "SEGMENT_4",
    type: "SEGMENT",
    text: "Segment 4",
    dishes: [
      { id: "SEGMENT_4_DISH_1", type: "DISH", text: "Dish 1" },
      { id: "SEGMENT_4_DISH_2", type: "DISH", text: "Dish 2" },
    ],
    childrens: [
      {
        id: "SEGMENT_4_CHILD_SEGMENT_1",
        type: "CHILD_SEGMENT",
        text: "Child Segment 1",
        dishes: [
          { id: "CHILD_SEGMENT_1_DISH_1", type: "DISH", text: "Dish 1" },
          { id: "CHILD_SEGMENT_1_DISH_2", type: "DISH", text: "Dish 2" },
          { id: "CHILD_SEGMENT_1_DISH_3", type: "DISH", text: "Dish 3" },
          { id: "CHILD_SEGMENT_1_DISH_4", type: "DISH", text: "Dish 4" },
        ],
      },
      {
        id: "SEGMENT_4_CHILD_SEGMENT_2",
        type: "CHILD_SEGMENT",
        text: "Child Segment 2",
      },
      {
        id: "SEGMENT_4_CHILD_SEGMENT_3",
        type: "CHILD_SEGMENT",
        text: "Child Segment 3",
      },
    ],
  },
  {
    id: "SEGMENT_5",
    type: "SEGMENT",
    text: "Segment 5",
    childrens: [
      {
        id: "SEGMENT_5_CHILD_SEGMENT_1",
        type: "CHILD_SEGMENT",
        text: "Child Segment 1",
      },
      {
        id: "SEGMENT_5_CHILD_SEGMENT_2",
        type: "CHILD_SEGMENT",
        text: "Child Segment 2",
      },
      {
        id: "SEGMENT_5_CHILD_SEGMENT_3",
        type: "CHILD_SEGMENT",
        text: "Child Segment 3",
      },
    ],
  },
];
export default data;
export type IData = (typeof data)[number];
