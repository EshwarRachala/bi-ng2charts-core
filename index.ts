import { NgModule, ModuleWithProviders } from '@angular/core';
import { D3Service } from './src/d3.service';

export * from './src/d3.service';

export {
  // d3-array
  Bin,
  Bisector,
  HistogramGenerator,
  Numeric,
  ThresholdArrayGenerator,
  ThresholdCountGenerator,
  // d3-axis
  Axis,
  AxisContainerElement,
  AxisScale,
  AxisTimeInterval,
  // d3-brush
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  // d3-chord
  ChordSubgroup,
  Chord,
  ChordGroup,
  ChordLayout,
  Chords,
  RibbonGenerator,
  // d3-collection
  Map,
  Nest,
  NestedArray,
  NestedMap,
  NestedObject,
  Set,
  Stringifiable,
  // d3-color
  Color,
  ColorCommonInstance,
  ColorFactory,
  ColorSpaceObject,
  CubehelixColor,
  CubehelixColorFactory,
  HCLColor,
  HCLColorFactory,
  HSLColor,
  HSLColorFactory,
  LabColor,
  LabColorFactory,
  RGBColor,
  RGBColorFactory,
  // d3-dispatch
  Dispatch,
  // d3-drag
  D3DragEvent,
  DragBehavior,
  DragContainerElement,
  DraggedElementBaseType,
  SubjectPosition,
  // d3-dsv
  DSV,
  DSVParsedArray,
  DSVRowAny,
  DSVRowString,
  // d3-ease
  BackEasingFactory,
  ElasticEasingFactory,
  PolynomialEasingFactory,
  // d3-force
  Force,
  ForceCenter,
  ForceCollide,
  ForceLink,
  ForceManyBody,
  ForceX,
  ForceY,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
  // d3-format
  FormatLocaleDefinition,
  FormatLocaleObject,
  FormatSpecifier,
  // d3-geo
  ExtendedFeature,
  ExtendedFeatureCollection,
  ExtendedGeometryCollection,
  GeoCircleGenerator,
  GeoConicProjection,
  GeoContext,
  GeoGeometryObjects,
  GeoGraticuleGenerator,
  GeoIdentityTranform,
  GeoPath,
  GeoPermissibleObjects,
  GeoProjection,
  GeoRawProjection,
  GeoRotation,
  GeoSphere,
  GeoStream,
  GeoStreamWrapper,
  GeoTransformPrototype,
  // d3-hierarchy
  ClusterLayout,
  HierarchyCircularLink,
  HierarchyCircularNode,
  HierarchyLink,
  HierarchyNode,
  HierarchyPointLink,
  HierarchyPointNode,
  HierarchyRectangularLink,
  HierarchyRectangularNode,
  PackCircle,
  PackLayout,
  PartitionLayout,
  RatioSquarifyTilingFactory,
  StratifyOperator,
  TreeLayout,
  TreemapLayout,
  // d3-interpolate
  ColorGammaInterpolationFactory,
  ZoomInterpolator,
  ZoomView,
  // d3-path
  Path,
  // d3-polygon
  // d3-quadtree
  Quadtree,
  QuadtreeInternalNode,
  QuadtreeLeaf,
  // d3-queue
  Queue,
  // d3-random
  // TODO: d3-request
  // d3-scale
  InterpolatorFactory,
  ScaleBand,
  ScaleIdentity,
  ScaleLinear,
  ScaleLogarithmic,
  ScaleOrdinal,
  ScalePoint,
  ScalePower,
  ScaleQuantile,
  ScaleQuantize,
  ScaleSequential,
  ScaleThreshold,
  ScaleTime,
  // d3-selection
  ArrayLike,
  BaseEvent,
  BaseType,
  ContainerElement,
  EnterElement,
  Local,
  NamespaceLocalObject,
  NamespaceMap,
  Selection,
  SelectionFn,
  TransitionLike,
  ValueFn,
  // d3-selection-multi
  ValueMap,
  // d3-shape
  Arc,
  Area,
  DefaultArcObject,
  Line,
  Pie,
  PieArcDatum,
  RadialArea,
  RadialLine,
  Series,
  SeriesPoint,
  Stack,
  Symbol,
  SymbolType,
  // d3-time
  CountableTimeInterval,
  TimeInterval,
  // d3-time-format
  TimeLocaleDefinition,
  TimeLocaleObject,
  // d3-timer
  Timer,
  // d3-transition
  Transition,
  // d3-voronoi
  VoronoiCell,
  VoronoiDiagram,
  VoronoiEdge,
  VoronoiLayout,
  VoronoiLink,
  VoronoiPoint,
  VoronoiPointPair,
  VoronoiPolygon,
  VoronoiSite,
  VoronoiTriangle,
  // d3-zoom
  D3ZoomEvent,
  ZoomBehavior,
  ZoomedElementBaseType,
  ZoomScale,
  ZoomTransform
} from './src/bundle-d3';

@NgModule({
  imports: [],
  declarations: [
  ],
  exports: [
  ],
  providers: [D3Service]

})

export class D3Module {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: D3Module,
      providers: [D3Service]
    };
  }
}
