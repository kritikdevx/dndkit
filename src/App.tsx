import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import data, { IData } from "./constants/data";
import { useState } from "react";
import { Check } from "lucide-react";

export default function App() {
  const [sortedItems, setSortedItems] = useState<IData[]>(data);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  return (
    <div className="p-4 text-sm grid grid-cols-2 items-start h-screen overflow-hidden">
      <div className="h-full overflow-y-auto">
        <SortableList
          items={sortedItems}
          setItems={setSortedItems}
          SortableItem={MenuSortableItem}
          selectedDishes={selectedDishes}
          setSelectedDishes={setSelectedDishes}
        />
      </div>
      <div className="h-full overflow-y-auto">
        {<pre>{JSON.stringify(selectedDishes, null, 2)}</pre>}

        <pre>{JSON.stringify(sortedItems, null, 2)}</pre>
      </div>
    </div>
  );
}

interface ISortableListProps {
  items: IData[];
  setItems: (items: IData[]) => void;
  SortableItem: React.ComponentType<ISortableItemProps>;
  selectedDishes: string[];
  setSelectedDishes: (dishes: string[]) => void;
}

interface ISortableItemProps {
  data: IData;
  items: IData[];
  setItems: (items: IData[]) => void;
  selectedDishes: string[];
  setSelectedDishes: (dishes: string[]) => void;
}

function SortableList({
  items,
  setItems,
  SortableItem,
  selectedDishes,
  setSelectedDishes,
}: ISortableListProps) {
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="grid gap-4">
          {items.map((item) => (
            <SortableItem
              key={item.id}
              data={item}
              items={items}
              setItems={setItems}
              selectedDishes={selectedDishes}
              setSelectedDishes={setSelectedDishes}
            />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId && (
          <SortableItem
            data={items.find((item) => item.id === activeId) || items[0]}
            items={items}
            setItems={setItems}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}

function MenuSortableItem({
  data,
  items,
  setItems,
  selectedDishes,
  setSelectedDishes,
}: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="border p-2 grid gap-2 border-zinc-700 bg-yellow-400">
        <p>{data.id}</p>

        {data.dishes && (
          <SortableList
            items={data.dishes}
            setItems={(newDishes) =>
              setItems(
                items.map((item) =>
                  item.id === data.id ? { ...item, dishes: newDishes } : item
                )
              )
            }
            SortableItem={DishSortableItem}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
          />
        )}

        {data.childrens && (
          <SortableList
            items={data.childrens}
            setItems={(newChildren) =>
              setItems(
                items.map((item) =>
                  item.id === data.id
                    ? { ...item, childrens: newChildren }
                    : item
                )
              )
            }
            SortableItem={ChildrenSortableItem}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
          />
        )}
      </div>
    </div>
  );
}

function DishSortableItem({
  data,
  selectedDishes,
  setSelectedDishes,
}: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="border p-2 gap-2 border-zinc-700 bg-pink-400 grid grid-cols-[1fr,auto] items-center">
        <p>{data.id}</p>

        <button
          className="bg-transparent border-white border rounded-md p-1 text-white"
          onPointerDown={(e) => e.stopPropagation()} // Prevent drag on button press
          onClick={(e) => {
            e.stopPropagation(); // Prevent propagation of the click event
            setSelectedDishes(
              selectedDishes.includes(data.id)
                ? selectedDishes.filter((dish) => dish !== data.id)
                : [...selectedDishes, data.id]
            );
          }}
        >
          {selectedDishes?.includes(data.id) ? (
            <Check className="text-white" size={16} />
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function ChildrenSortableItem({
  data,
  items,
  setItems,
  selectedDishes,
  setSelectedDishes,
}: ISortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="border p-2 grid gap-2 border-zinc-700 bg-blue-400">
        <p>{data.id}</p>

        {data.dishes && (
          <SortableList
            items={data.dishes}
            setItems={(newDishes) =>
              setItems(
                items.map((item) =>
                  item.id === data.id ? { ...item, dishes: newDishes } : item
                )
              )
            }
            SortableItem={DishSortableItem}
            selectedDishes={selectedDishes}
            setSelectedDishes={setSelectedDishes}
          />
        )}
      </div>
    </div>
  );
}
