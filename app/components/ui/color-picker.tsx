import { Text } from "../helper/text";
import { Sketch } from '@uiw/react-color';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Bands, Characters } from "@/constants";
import { cn } from "@/lib/utils";
import { Dialog } from "./dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ColorPickerContentProps {
  currentColor: string;
  onChange: (color: string) => void;
}

function ColorPickerContent({
  currentColor,
  onChange
}: ColorPickerContentProps) {

  return (
    <div data-vaul-no-drag>
      <Tabs defaultValue="picker">
        <TabsList className="bg-slate-300">
          <TabsTrigger value="picker"><Text>Picker</Text></TabsTrigger>
          <TabsTrigger value="character"><Text>Character</Text></TabsTrigger>
          <TabsTrigger value="band"><Text>Band</Text></TabsTrigger>
        </TabsList>

        <TabsContent value="picker" className="flex items-center justify-center h-full">
          <Sketch
            disableAlpha
            color={currentColor}
            onChange={(color) => onChange(color.hex)}
          />
        </TabsContent>

        <TabsContent value="character">
          <div className="w-full h-70 grid grid-cols-4 gap-2 overflow-scroll scrollbar-none">
            {
              Characters.map((character) => {
                const isSelected = (Array.isArray(character.image_color) ? character.image_color[0] : character.image_color) === currentColor;

                return (
                <button
                  key={`character_${character.id}`}
                  className={cn("rounded-md px-2 py-1 col-span-1 flex flex-col gap-2 items-center hover:bg-black/20", isSelected ? 'bg-black/10' : 'bg-transparent')}
                  onClick={() => onChange(Array.isArray(character.image_color) ? character.image_color[0] : character.image_color)}
                >
                  <div className="rounded-full size-4" style={{backgroundColor:(Array.isArray(character.image_color) ? character.image_color[0] : character.image_color)}} />
                  <Text type='c' className="text-center">{ Array.isArray(character.nickname) ? character.nickname[0] : character.nickname }</Text>
                </button>
              )
              })
            }
          </div>
        </TabsContent>

        <TabsContent value="band">
          <div className="w-full h-70 grid grid-cols-2 gap-2 overflow-scroll scrollbar-none">
            {
              Bands.filter((band) => band.id !== 99).map((band) => {
                const isColorSelected = band.color === currentColor;
                const isDarkColorSelected = band.colorDark === currentColor;

                return (
                  <div key={`band_${band.id}`} className="flex flex-col col-span-1 gap-1 justify-center">
                    <div className="flex flex-row w-full items-center justify-center gap-1">
                      <button
                        className={cn("bg-transparent rounded-md p-2 hover:bg-black/5", isColorSelected ? 'bg-black/5' : 'bg-transparent')}
                        onClick={() => onChange(band.color)}
                      >
                        <div className="rounded-full size-4" style={{backgroundColor:band.color}} />
                      </button>
                      <button
                        className={cn("bg-transparent rounded-md p-2 hover:bg-black/5", isDarkColorSelected ? 'bg-black/5' : 'bg-transparent')}
                        onClick={() => onChange(band.colorDark)}
                      >
                        <div className="rounded-full size-4" style={{backgroundColor:band.colorDark}} />
                      </button>
                    </div>
                    <Text type='c' className="text-center">{band.name}</Text>
                  </div>
                )
              })
            }
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function ColorPicker({
  type,
  currentColor,
  onChange,
  triggerClassname
}: ColorPickerContentProps & {type: 'popover' | 'dialog'; triggerClassname?: string;}) {

  return (
    type === 'popover' ? (
      <Popover>
        <PopoverTrigger asChild>
          <button className={cn("flex flex-row w-30 items-center justify-between h-fit border px-2 py-1 rounded-md bg-white hover:bg-black/5", triggerClassname)}>
            <Text lineHeight={5}>{currentColor}</Text>
            <div className="w-5 h-5 shrink-0 border rounded-full" style={{backgroundColor:currentColor}} />
          </button>
        </PopoverTrigger>
        <PopoverContent usePortal={false} className="h-90 w-75">
          <ColorPickerContent currentColor={currentColor} onChange={onChange} />
        </PopoverContent>
      </Popover>
    ) : (
      <Dialog>

      </Dialog>
    )
  )
}