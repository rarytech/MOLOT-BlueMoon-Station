import { useBackend } from '../../backend';
import { BlockQuote, Icon, ProgressBar, Section, Stack, Slider, Tooltip } from '../../components';

type HeaderInfo = {
  isTargetSelf: boolean;
  interactingWith: string;
  lust: number;
  maxLust: number;
  selfAttributes: string[];
  theirAttributes: string[];
  theirLust: number;
  theirMaxLust: number;
  moan: number;
  mood: number;
  enable_mood: boolean;
  enable_moan: boolean;
}

export const InfoSection = (props, context) => {
  const { act, data } = useBackend<HeaderInfo>(context);
  const {
    isTargetSelf,
    interactingWith,
    lust,
    maxLust,
    selfAttributes,
    theirAttributes,
    theirLust,
    theirMaxLust,
    moan,
    mood,
    enable_mood,
    enable_moan,
  } = data;
  return (
    <Section title={interactingWith} fill>
      <Stack vertical fill>
        <Stack.Item grow basis={0}>
          <Section fill overflow="auto">
            <Stack>
              <Stack.Item>
                <BlockQuote>
                  You...<br />
                  {selfAttributes.map(attribute => (
                    <div key={attribute}>
                      {attribute}<br />
                    </div>
                  ))}
                </BlockQuote>
              </Stack.Item>
              {!isTargetSelf ? (
                <Stack.Item>
                  <BlockQuote>
                    They...<br />
                    {theirAttributes.map(attribute => (
                      <div key={attribute}>
                        {attribute}<br />
                      </div>
                    ))}
                  </BlockQuote>
                </Stack.Item>
              ) : (null)}
            </Stack>
          </Section>
        </Stack.Item>
        <Stack.Item>
          <Stack fill>
            <Stack.Item grow>
              <ProgressBar fill value={lust} maxValue={maxLust} color="purple"><Icon name="heart" /></ProgressBar>
            </Stack.Item>
            {(!isTargetSelf && (theirLust !== null) ? (
              <Stack.Item grow>
                <ProgressBar value={theirLust} maxValue={theirMaxLust} color="purple"><Icon name="heart" /></ProgressBar>
              </Stack.Item>
            ) : (null))}
          </Stack>
        </Stack.Item>
        <Stack.Item>
          <Stack fill>
            {(enable_mood ? (
              <Stack.Item grow>
              <Slider
                minValue={0}
                maxValue={300}
                step={1}
                value={ mood }
                unit="%"
                ranges={{
                  bad: [-Infinity, 25],
                  average: [26, 125],
                  good: [126, Infinity],
                }}
                onChange={(_, value) => act("dynamic", {type: 'multiplier', amount: value})}
              >Arousal Multiplier</Slider>
            </Stack.Item>
            ) : (null))}

            {(enable_moan ? (
              <Stack.Item grow>
              <Slider
                minValue={0}
                maxValue={100}
                step={1}
                value={ moan }
                unit="%"
                onChange={(_, value) => act("dynamic", {type: 'moan', amount: value})}
              >Moaning Chance</Slider>
            </Stack.Item>
            ) : (null))}
          </Stack>
        </Stack.Item>

      </Stack>
    </Section>
  );
};
