name := "schich.tel"
version := "1.0"

enablePlugins(ScalaJSPlugin)

scalaVersion := "2.13.2"
scalaJSUseMainModuleInitializer := true

libraryDependencies ++= Seq(
  "org.scala-js" %%% "scalajs-dom" % "1.0.0",
  "com.softwaremill.sttp.client" %%% "core" % "2.2.0"
)

