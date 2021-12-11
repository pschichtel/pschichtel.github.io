name := "schich.tel"
version := "1.0"

enablePlugins(ScalaJSPlugin)

scalaVersion := "3.1.0"
scalaJSUseMainModuleInitializer := true

libraryDependencies ++= Seq(
  "org.scala-js" %%% "scalajs-dom" % "2.0.0",
  "com.softwaremill.sttp.client3" %%% "core" % "3.3.18"
)

scalacOptions ++= Seq("--unchecked", "--deprecation")
